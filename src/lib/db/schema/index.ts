import { mysqlTable, bigint, varchar } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('auth_user', {
	id: varchar('id', {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
	// other user attributes
	username: varchar('username', {
		length: 55
	}),
	names: varchar('names', {
		length: 255
	}),
	lastNames: varchar('last_names', {
		length: 255
	})
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
