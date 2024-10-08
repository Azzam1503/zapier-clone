import {z} from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(5),
    email: z.string().email().min(8),
    password: z.string().min(6)
});

export const SignInSchema = z.object({
    email: z.string().email().min(8),
    password: z.string().min(6)
});

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(
        z.object({
            availableActionId: z.string(),
            actionMetadata: z.any().optional()
        })
    )
})