/*
  Warnings:

  - You are about to drop the `Authentication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_authenticationId_fkey];

-- DropTable
DROP TABLE [dbo].[Authentication];

-- DropTable
DROP TABLE [dbo].[User];

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [lastname] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [birth] DATETIME2 NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [authenticationId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [users_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [users_email_key] UNIQUE ([email]),
    CONSTRAINT [users_authenticationId_key] UNIQUE ([authenticationId])
);

-- CreateTable
CREATE TABLE [dbo].[authentications] (
    [id] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [Status] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [authentications_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [authentications_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_authenticationId_fkey] FOREIGN KEY ([authenticationId]) REFERENCES [dbo].[authentications]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
