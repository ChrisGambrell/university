-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "created" DROP DEFAULT,
ALTER COLUMN "current_period_start" DROP DEFAULT,
ALTER COLUMN "current_period_end" DROP DEFAULT,
ALTER COLUMN "ended_at" DROP NOT NULL,
ALTER COLUMN "ended_at" DROP DEFAULT,
ALTER COLUMN "cancel_at" DROP NOT NULL,
ALTER COLUMN "cancel_at" DROP DEFAULT,
ALTER COLUMN "canceled_at" DROP NOT NULL,
ALTER COLUMN "canceled_at" DROP DEFAULT,
ALTER COLUMN "trial_start" DROP NOT NULL,
ALTER COLUMN "trial_start" DROP DEFAULT,
ALTER COLUMN "trial_end" DROP NOT NULL,
ALTER COLUMN "trial_end" DROP DEFAULT;
