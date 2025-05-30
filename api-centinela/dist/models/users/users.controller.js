"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dtos/user.dto");
const users_service_1 = require("./users.service");
const serialize_interceptor_1 = require("../common/interceptors/serialize.interceptor");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
    async getUsers() {
        const users = await this.userService.findUsers();
        return users;
    }
    async getUserById(id) {
        const user = await this.userService.findOneUser(id);
        return user;
    }
    async updateUserById(id, body) {
        return this.userService.updateUser(id, body);
    }
    async deleteUserById(id) {
        return this.userService.removeUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear un usuario',
        description: 'Crea un usuario si los datos son válidos',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuario creado correctamente' }),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    openapi.ApiResponse({ status: 201, type: require("./user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los usuarios',
        description: 'Obtiene todos los usuarios',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de usuarios',
        type: user_dto_1.UserDto,
        isArray: true,
    }),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    openapi.ApiResponse({ status: 200, type: [require("./user.entity").User] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener usuario por id',
        description: 'Obtiene un usuario a partir de su id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario encontrado',
        type: user_dto_1.UserDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id del usuario a buscar' }),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    openapi.ApiResponse({ status: 200, type: require("./user.entity").User }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar usuario por id',
        description: 'Actualiza un usuario a partir de su id. Es necesario enviar todos los campos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario actualizado',
        type: user_dto_1.UserDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id del usuario a actualizar' }),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    openapi.ApiResponse({ status: 200, type: require("./user.entity").User }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar usuario por id',
        description: 'Elimina un usuario a partir de su id',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario eliminado', type: user_dto_1.UserDto }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id del usuario a eliminar' }),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    openapi.ApiResponse({ status: 200, type: require("./user.entity").User }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map