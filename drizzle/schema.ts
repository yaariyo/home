import { mysqlTable, int, varchar, datetime, boolean } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  mobile: varchar('mobile', { length: 20 }),
  country: varchar('country', { length: 100 }),
  createdAt: datetime('created_at').notNull(),
  resetToken: varchar('reset_token', { length: 255 }),
  resetTokenExpiry: int('reset_token_expiry'),
  emailVerified: boolean('email_verified').notNull().default(false),
  emailVerificationToken: varchar('email_verification_token', { length: 255 }),
  emailVerificationTokenExpiry: int('email_verification_token_expiry'),
}); 