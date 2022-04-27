BEGIN TRY

BEGIN TRAN;

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
    [status] BIT NOT NULL CONSTRAINT [authentications_status_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [authentications_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [authentications_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_authenticationId_fkey] FOREIGN KEY ([authenticationId]) REFERENCES [dbo].[authentications]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
