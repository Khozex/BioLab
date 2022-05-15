import { Test, TestingModule } from '@nestjs/testing';
import { Seacher } from './Seacher.entity';
import { SeacherDto } from './SeacherDTO.entity';
import { SeacherService } from './Seacher.service';


describe("SeacherService", () => {
    let service: SeacherService

    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        findOneBy: jest.fn(),
        remove: jest.fn()
    }

    const mockSeacher: Seacher = {
        "id": 1,
        "name": "Ismael",
        "email": "teste42@gmail.com",
        "password": "1234",
        "matriculation": "12321323",
        "lattesLink": "www.google.com",
        "area_of_interest": "Animais fantasticos",
        "active": true
    }

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [SeacherService,
                {
                    provide: "SEACHER_REPOSITORY",
                    useValue: mockRepository,
                }
            ]
        }).compile();

        service = module.get<SeacherService>(SeacherService)
    })

    afterEach(async () => {
        jest.clearAllMocks();
    })

    it('Should be defined', () => {
        expect(service).toBeDefined();
    })


    describe('create', () => {

        it('Should be create new user', async () => {
            mockRepository.create.mockReturnValue(mockSeacher)
            mockRepository.save.mockReturnValue(mockSeacher)
            const userCreated = await service.create(mockSeacher)

            expect(userCreated).toMatchObject(mockSeacher)
            expect(mockRepository.save).toBeCalledTimes(1);
            expect(mockRepository.findOneBy).toBeCalledTimes(2);
        })

        it('Should not create new user if having user with email exist', async () => {
            mockRepository.create.mockReturnValue(mockSeacher)
            mockRepository.save.mockReturnValue(null)
            const userCreated = await service.create(mockSeacher)
            await service.create(mockSeacher).catch(e => {
                expect(e).toBeInstanceOf(Error);
                expect(e).toMatchObject("Seacher already exists!")
                expect(mockRepository.save).toBeCalledTimes(0);
            })
        })

        it('Should not create new user if having user with matriculation exist', async () => {
            mockRepository.create.mockReturnValue(mockSeacher);
            mockRepository.save.mockReturnValue(null);
            await service.create(mockSeacher);
            mockSeacher.email = 'Teste2@gmail2.com'
            await service.create(mockSeacher).catch(e => {
                expect(e).toBeInstanceOf(Error);
                expect(e).toMatchObject("Seacher already exists!")
                expect(mockRepository.save).toBeCalledTimes(0);
            })
        })

        it('Should get user with email', async () => {
            mockRepository.findOneBy.mockReturnValue(mockSeacher);
            const seacher = await service.findOneByEmail(mockSeacher.email);
            expect(seacher).toMatchObject(mockSeacher);
            expect(mockRepository.findOneBy).toBeCalledTimes(1);
        })

        it('Should not get user with email inexist', async () => {
            mockRepository.findOneBy.mockReturnValue({});
            await service.findOneByEmail(mockSeacher.email).catch(e => {
                expect(e).toMatchObject('Seacher not exists!');
                expect(mockRepository.findOneBy).toBeCalledTimes(1);
            })
        })

        it('Should get user with id', async () => {
            mockRepository.findOneBy.mockReturnValue(mockSeacher);
            const seacher = await service.findById(1);
            expect(seacher).toMatchObject(mockSeacher);
            expect(mockRepository.findOneBy).toBeCalledTimes(1);
        })

        it('Should not get user with id inexist', async () => {
            mockRepository.findOneBy.mockReturnValue({});
            await service.findById(1).catch(e => {
                expect(e).toMatchObject('Seacher inexist!')
                expect(mockRepository.findOneBy).toBeCalledTimes(1);
            })
        })

    })

    describe('delete', () => {

        it('Should delete user', async () => {
            mockRepository.findOneBy.mockReturnValue(mockSeacher);
            mockRepository.remove.mockReturnValue(mockSeacher);
            await service.delete(mockSeacher.email);
            expect(mockRepository.findOneBy).toBeCalledTimes(1);
        })

        it('Should not delete inexistent user', async () => {
            mockRepository.findOneBy.mockReturnValue({});

            await service.delete(mockSeacher.email).catch(e => {
                expect(e).toMatchObject("Seacher not exists!");
                expect(mockRepository.findOneBy).toBeCalledTimes(1);
                expect(mockRepository.remove).toBeCalledTimes(0);

            })
        })
    })

    describe('Should update user', () => {

        it('Should update user', async () => {
            mockRepository.findOneBy.mockReturnValue(mockSeacher);
            mockSeacher.name = "Teles";
            let mockSeacherUpdate = mockSeacher
            mockRepository.save.mockReturnValue(mockSeacherUpdate);
            mockRepository.update.mockReturnValue(mockSeacherUpdate);
            const resultUpdate = await service.update(1, mockSeacherUpdate);
            expect(resultUpdate).toMatchObject(mockSeacherUpdate);
            expect(mockRepository.findOneBy).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        })

        it('Should not update inexistent user', async () => {
            mockRepository.findOneBy.mockReturnValue({});
            mockRepository.save.mockReturnValue(null);
            mockRepository.update.mockReturnValue(null);

            await service.update(1, mockSeacher).catch(e => {
                expect(e).toMatchObject('Seacher not exists!');
                expect(mockRepository.findOneBy).toBeCalledTimes(1);
                expect(mockRepository.save).toBeCalledTimes(0);
            })
        })

        it('Should update one field', async () => {
            let seacherDto: SeacherDto = { name: "Ismael Teles" };
            mockRepository.findOneBy.mockReturnValue(mockSeacher);
            mockSeacher.name = 'Ismael Teles';
            mockRepository.save.mockReturnValue(mockSeacher);
            mockRepository.update.mockReturnValue(mockRepository);
            let result = await service.updateField(1, seacherDto);


            expect(result).toMatchObject(mockSeacher);
            expect(mockRepository.findOneBy).toBeCalledTimes(1);
            expect(mockRepository.save).toBeCalledTimes(1);
        })

        it('Should not update field inexistent seacher', async () => {
            let seacherDto: SeacherDto = { name: "Ismael Teles" };
            mockRepository.findOneBy.mockReturnValue({});
            mockRepository.save.mockReturnValue({});

            await service.updateField(1, seacherDto).catch(e => {
                expect(e).toMatchObject('Seacher not exist!')
                expect(mockRepository.findOneBy).toBeCalledTimes(1);
                expect(mockRepository.save).toBeCalledTimes(0);
            })
        })
    })


})