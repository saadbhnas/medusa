import { Migration } from '@mikro-orm/migrations';

export class Migration20250217175241 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "review" rename column "describtion" to "description";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "review" rename column "description" to "describtion";`);
  }

}
