import {z} from 'zod';

export const SignupSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6)
});

// export default SignupData = z.object({
//     username: z.string(),
//     password: z.string()
// });

// export default SignupData = z.object({
//     username: z.string(),
//     password: z.string()
// })