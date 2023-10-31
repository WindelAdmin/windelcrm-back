import { Injectable } from '@nestjs/common';
import AbstractService from '@src/interfaces/AbstractService';
import CompanyRepository from '@src/modules/person/company/Company.repository';

@Injectable()
export default class CompanyService extends AbstractService<CompanyRepository> {}