import { pgTable, varchar } from 'drizzle-orm/pg-core'

export const user = pgTable('auth_user', {
	id: varchar('id', {
		length: 15
	}).primaryKey(),
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

export const session = pgTable('user_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull()
})

export const key = pgTable('user_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
})
