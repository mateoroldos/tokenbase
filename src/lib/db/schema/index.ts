import { mysqlTable, bigint, varchar, boolean } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	username: varchar('username', {
		length: 55
	})
		.unique()
		.notNull(),
	email: varchar('email', {
		length: 255
	}).notNull(),
	email_verified: boolean('email_verified').notNull()
})

export const session = mysqlTable('user_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
})

export const key = mysqlTable('user_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	// .references(() => user.id),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
})

export const emailToken = mysqlTable('email_verification_token', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	expires: bigint('expires', {
		mode: 'number'
	}).notNull()
})

export const passwordResetToken = mysqlTable('password_reset_token', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	expires: bigint('expires', {
		mode: 'number'
	}).notNull()
})
