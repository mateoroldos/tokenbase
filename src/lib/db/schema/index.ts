import { relations } from 'drizzle-orm'
import { mysqlTable, bigint, varchar, boolean } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('auth_user', {
	id: varchar('id', {
		length: 20
	}).primaryKey(),
	email: varchar('email', {
		length: 255
	})
		.unique()
		.notNull(),
	email_verified: boolean('email_verified').notNull()
})

export const usersRelations = relations(user, ({ many }) => ({
	session: many(session),
	key: many(key),
	emailToken: many(emailToken),
	passwordResetToken: many(passwordResetToken)
}))

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

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}))

export const key = mysqlTable('user_key', {
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

export const keyRelations = relations(key, ({ one }) => ({
	user: one(user, {
		fields: [key.userId],
		references: [user.id]
	})
}))

export const emailToken = mysqlTable('email_verification_token', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	expires: bigint('expires', {
		mode: 'number'
	}).notNull()
})

export const emailTokenRelations = relations(emailToken, ({ one }) => ({
	user: one(user, {
		fields: [emailToken.userId],
		references: [user.id]
	})
}))

export const passwordResetToken = mysqlTable('password_reset_token', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	expires: bigint('expires', {
		mode: 'number'
	}).notNull()
})

export const passwordResetTokenRelations = relations(
	passwordResetToken,
	({ one }) => ({
		user: one(user, {
			fields: [passwordResetToken.userId],
			references: [user.id]
		})
	})
)

export const workspace = mysqlTable('workspace', {
	id: varchar('id', { length: 255 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	ownerId: varchar('owner_id', {
		length: 15
	}).notNull()
})

export const workspaceRelations = relations(workspace, ({ one }) => ({
	owner: one(user, {
		fields: [workspace.ownerId],
		references: [user.id]
	})
}))

export const workspaceMember = mysqlTable('workspace_member', {
	workspaceId: varchar('workspace_id', {
		length: 255
	}).notNull(),
	userId: varchar('user_id', {
		length: 15
	}).notNull()
})

export const workspaceMemberRelations = relations(
	workspaceMember,
	({ one }) => ({
		workspace: one(workspace, {
			fields: [workspaceMember.workspaceId],
			references: [workspace.id]
		}),
		user: one(user, {
			fields: [workspaceMember.userId],
			references: [user.id]
		})
	})
)

export const designSystem = mysqlTable('design_system', {
	id: varchar('id', { length: 255 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	workspaceId: varchar('workspace_id', {
		length: 255
	}).notNull()
})

export const designSystemRelations = relations(designSystem, ({ one }) => ({
	workspace: one(workspace, {
		fields: [designSystem.workspaceId],
		references: [workspace.id]
	})
}))
