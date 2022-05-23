import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import admin = require('firebase-admin');
// import serviceAccount = require('./auth/api-occri-firebase-adminsdk-oicf0-ec29d5b4fd.json');
import { applicationDefault } from 'firebase-admin/app';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    // admin.initializeApp({
    //   serviceAccountId: 'api-occri-firebase-adminsdk-oicf0-ec29d5b4fd',
    // });

    console.log(admin.app());

    return this.appService.getHello();
  }
}
