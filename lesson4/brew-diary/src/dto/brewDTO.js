import zod from "zod"
export const BrewDTO = zod.object({
    beans: zod.string().min(3).max(40),
    method: zod.enum(['v60', 'aeropress', 'chemex', 'espresso']),
    rating: zod.number().min(1).max(5).optional(),
    notes: zod.string().max(200).optional(),
    brewAt: zod.string().datetime().optional()
})

export const QuerySchema = zod.object({
    method: zod.enum(['v60', 'aeropress', 'chemex', 'espresso']).optional(),
    ratingMin: zod.coerce.number().min(1).max(5).optional()
})