import { z } from "zod";

const UserLoginSchema = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});

const SignupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),
  confirmPassword: z.string(),
  otp: z.string(),
});

const HomeSchema = z.object({
  id: z.number().optional(),
  images: z.array(z.string()),
  client: z.string(),
  linkedin: z.string(),
  project: z.string(),
  image_1: z.string(),
  image_2: z.string(),
  image_3: z.string(),
  location: z.string(),
  instagram: z.string(),
  x: z.string(),
  whatsapp: z.string(),
  quote_image: z.string(),
  mail: z.string(),
  aim: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  quote: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  author: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
});

const BuildSchema = z.object({
  metaId: z.number().optional(),
  thumbnail: z.string(),
  id: z.number().optional(),
  images: z.array(z.string()),
  title: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  location: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  scope: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  year: z.string().optional(),
  status: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  team: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  briefing: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  briefing_image: z.string().optional(),
  architectural_solution: z.object({
    ar: z.string().optional(),
    en: z.string().optional(),
  }),
  meta: z.object({
    title: z.object({
      ar: z.string().optional(),
      en: z.string().optional(),
    }),
    description: z.object({
      ar: z.string().optional(),
      en: z.string().optional(),
    }),
  }),
  buildCategoryId: z.number(),
  architectural_solution_image: z.string().optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
});
const DesignSchema = z.object({
  metaId: z.number().optional().or(z.null()),
  thumbnail: z.string(),
  meta: z.object({
    title: z.object({
      ar: z.string().optional(),
      en: z.string().optional(),
    }),
    description: z.object({
      ar: z.string().optional(),
      en: z.string().optional(),
    }),
  }),
  id: z.number().optional(),
  images: z.array(z.string()),
  title: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  location: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  scope: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  year: z.string().optional(),
  status: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  team: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  briefing: z
    .object({
      ar: z.string().optional(),
      en: z.string().optional(),
    })
    .optional(),
  briefing_image: z.string().optional(),
  architectural_solution: z.object({
    ar: z.string().optional(),
    en: z.string().optional(),
  }),
  designCategoryId: z.number(),
  architectural_solution_image: z.string().optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
});
const categorySchema = z.object({
  id: z.number().optional(),
  name: z.object({
    ar: z.string(),
    en: z.string(),
  }),
});
const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
  isRead: z.boolean().optional(),
});
export const BlogSchema = z.object({
  metaId: z.number().optional(),
  thumbnail: z.string(),
  meta: z.object({
    title: z.object({
      ar: z.string().optional(),
      en: z.string().optional(),
    }),
    description: z.object({
      ar: z.string().optional(),
      en: z.string().optional(),
    }),
  }),
  id: z.number().optional(),
  title: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  description: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  image: z.string().optional(),
  content: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  authorId: z.number(),
  date: z.date(),
  relatedBlogs: z.array(z.number().optional()).optional(),
});

export type BlogType = z.infer<typeof BlogSchema>;

export const AuthorSchema = z.object({
  id: z.number().optional(),

  name: z.object({
    en: z.string(),
    ar: z.string(),
  }),

  job_title: z.object({
    en: z.string(),
    ar: z.string(),
  }),
  image: z.string(),
});
export type AuthorType = z.infer<typeof AuthorSchema>;

type Contact = z.infer<typeof contactSchema>;
type Category = z.infer<typeof categorySchema>;
type Design = z.infer<typeof DesignSchema>;
type Build = z.infer<typeof BuildSchema>;
type Signup = z.infer<typeof SignupSchema>;

type UserLogin = z.infer<typeof UserLoginSchema>;
type Home = z.infer<typeof HomeSchema>;

export {
  BuildSchema,
  categorySchema,
  contactSchema,
  DesignSchema,
  HomeSchema,
  SignupSchema,
  UserLoginSchema,
  type Build,
  type Category,
  type Contact,
  type Design,
  type Home,
  type Signup,
  type UserLogin,
};
