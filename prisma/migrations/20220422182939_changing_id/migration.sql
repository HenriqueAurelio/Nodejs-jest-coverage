BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [lastname] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [birth] DATETIME2 NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [authenticationId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_key] UNIQUE ([email]),
    CONSTRAINT [User_authenticationId_key] UNIQUE ([authenticationId])

    
);

-- CreateTable
CREATE TABLE [dbo].[Authentication] (
    [id] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [Status] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Authentication_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Authentication_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_authenticationId_fkey] FOREIGN KEY ([authenticationId]) REFERENCES [dbo].[Authentication]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
