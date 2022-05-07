import { Test, TestingModule } from '@nestjs/testing';
import { Seacher } from './Seacher.entity';
import { SeacherService } from './Seacher.service';


describe("SeacherService", () => {
    let service: SeacherService
    
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        findOneBy: jest.fn(),
        createQueryBuilder: jest.fn()
    }

    const mockSeacher: Seacher = {
        "name" : "Ismael",
        "email" : "teste42@gmail.com",
        "password" : "1234",
        "matriculation" : "12321323",
        "lattesLink" : "www.google.com",
        "area_of_interest" : "Animais fantasticos",
        "active": true
    }

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers:[SeacherService,
                {
                    provide: "SEACHER_REPOSITORY",
                    useValue: mockRepository,
                }
            ]
        }).compile();

        service = module.get<SeacherService>(SeacherService)
    })

    it('Should be defined', () => {
        expect(service).toBeDefined();
    })

    
    describe('create' ,() => {

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
            const userCreated = await service.create(mockSeacher);
            mockSeacher.email = 'Teste2@gmail2.com'
            await service.create(mockSeacher).catch(e => {
                expect(e).toBeInstanceOf(Error);
                expect(e).toMatchObject("Seacher already exists!")
                expect(mockRepository.save).toBeCalledTimes(0);
            })
        })

    })
})