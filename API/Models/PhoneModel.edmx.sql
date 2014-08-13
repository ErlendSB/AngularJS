
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 08/04/2014 11:33:30
-- Generated from EDMX file: C:\Dev\TestMVC\AngularTest\API\Models\PhoneModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [PhoneDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Phone]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Phone];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Phones'
CREATE TABLE [dbo].[Phones] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [PhoneId] varchar(50)  NULL,
    [Carrier] varchar(50)  NULL,
    [Age] int  NULL,
    [Snippet] varchar(50)  NULL,
    [Name] varchar(50)  NULL,
    [ImageUrl] varchar(100)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Phones'
ALTER TABLE [dbo].[Phones]
ADD CONSTRAINT [PK_Phones]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------