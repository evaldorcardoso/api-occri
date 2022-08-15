import { Space } from '../spaces/space.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Plan } from 'src/plans/plan.entity';

export default class CreateSpaces implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Space)
      .values([
        {
          uuid: '0b5fd00b-3043-4bcc-a52d-3b9b62dcfb47',
          name: 'Espaço compartilhado',
          description: 'Um Espaço compartilhado',
        },
        {
          uuid: '674e7aa1-24be-45b2-9988-9ae5a2ecb376',
          name: 'Espaço kids',
          description: 'Um espaço para as crianças',
        },
        {
          uuid: 'c15d602e-cf1e-472c-a2d8-6320903ddd3f',
          name: 'Espaço privativo',
          description: 'Um espaço privado',
        },
        {
          uuid: 'ba7f04bc-a720-4c4a-a63a-1a3b24c464f8',
          name: 'Espaço gravação',
          description: 'Um espaço para gravação',
        },
        {
          uuid: '59e700d9-e57c-4182-bcf5-92d4282812a6',
          name: 'Espaço salão/eventos',
          description: 'Um espaço para eventos',
        },
      ])
      .execute();

    const spaces = await connection.manager.find(Space);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Plan)
      .values([
        {
          uuid: '61c75d17-bce2-476f-aa1f-5380bb5f7c5c',
          name: 'Compartilhado por hora',
          value: 30,
          description: 'Compartilhado por hora',
          space: spaces[0],
        },
        {
          uuid: '61c75d17-bce2-476f-aa1f-5380bb5f7c5c',
          name: 'Gravação por hora',
          value: 30,
          description: 'Gravação por hora',
          space: spaces[3],
        },
        {
          uuid: '5ee77669-b414-4d9e-8db9-aef2e427be9f',
          name: 'Privativo por turno',
          value: 100,
          description: 'Privativo por turno',
          space: spaces[2],
        },
        {
          uuid: '328d99d7-0bbd-4128-b2fc-64a2f233e2c5',
          name: 'Salão, Eventos Diária',
          value: 180,
          description: 'Salão, Eventos Diária',
          space: spaces[4],
        },
        {
          uuid: '2f891f6b-2307-468d-9888-01dc0c7da6e6',
          name: 'Compartilhado por Mês',
          value: 1200,
          description: 'Compartilhado por Mês',
          space: spaces[0],
        },
        {
          uuid: '7d623de1-a0c8-433d-ab69-dfc8b404b0d3',
          name: 'Salão, Eventos Datas Especiais',
          value: 500,
          description: 'Salão, Eventos Datas Especiais',
          space: spaces[4],
        },
      ])
      .execute();
  }
}
