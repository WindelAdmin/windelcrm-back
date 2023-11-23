import { UserController } from '@modules/core/user/User.controller';
import UserCreateDto from '@modules/core/user/dtos/UserCreate.dto';
import { UserUpdateDto } from '@modules/core/user/dtos/UserUpdate.dto';
import UserCreateService from '@modules/core/user/use-cases/UserCreate.service';
import UserDeleteService from '@modules/core/user/use-cases/UserDelete.service';
import UserFindAllService from '@modules/core/user/use-cases/UserFindAll.service';
import UserFindByIdService from '@modules/core/user/use-cases/UserFindById.service';
import UserUpdateService from '@modules/core/user/use-cases/UserUpdate.service';
import { Test, TestingModule } from '@nestjs/testing';


describe('UserController', () => {
  let controller: UserController;
  let mockUserCreateService: UserCreateService;
  let mockUserUpdateService: UserUpdateService;
  let mockUserFindAllService: UserFindAllService;
  let mockUserFindByIdService: UserFindByIdService;
  let mockUserDeleteService: UserDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserCreateService, useValue: mockUserCreateService },
        { provide: UserUpdateService, useValue: mockUserUpdateService },
        { provide: UserFindAllService, useValue: mockUserFindAllService },
        { provide: UserFindByIdService, useValue: mockUserFindByIdService },
        { provide: UserDeleteService, useValue: mockUserDeleteService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the UserCreateService.execute method', async () => {
      const mockData: UserCreateDto = { name: 'John Doe', email: 'johndoe@example.com', password: '1232313' };
      const mockCreateService = jest.spyOn(mockUserCreateService, 'execute');

      await controller.create(mockData);

      expect(mockCreateService).toHaveBeenCalledWith(mockData);
    });
  });

  describe('update', () => {
    it('should call the UserUpdateService.execute method', async () => {
      const id = 1;
      const mockData: UserUpdateDto = { name: 'Jane Doe',  };
      const mockUpdateService = jest.spyOn(mockUserUpdateService, 'execute');

      await controller.update(id, mockData);

      expect(mockUpdateService).toHaveBeenCalledWith({ id, data: mockData });
    });
  });

  describe('delete', () => {
    it('should call the UserDeleteService.execute method', async () => {
      const id = 1;
      const mockDeleteService = jest.spyOn(mockUserDeleteService, 'execute');

      await controller.delete({ id });

      expect(mockDeleteService).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should call the UserFindAllService.execute method', async () => {
      const mockFindAllService = jest.spyOn(mockUserFindAllService, 'execute');

      await controller.findAll();

      expect(mockFindAllService).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should call the UserFindByIdService.execute method', async () => {
      const id = 1;
      const mockFindByIdService = jest.spyOn(mockUserFindByIdService, 'execute');

      await controller.findById(id);

      expect(mockFindByIdService).toHaveBeenCalledWith(id);
    });
  });
});
