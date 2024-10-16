import z from 'zod';

export namespace DataDto {
  export type RawDataFrame = z.infer<typeof RawDataFrame>;
  export const RawDataFrame = z.object({
    lat: z.number(),
    lon: z.number(),
    pm: z.number(),
    year: z.number(),
  });

  export type DataFrame = z.infer<typeof DataFrame>;
  export const DataFrame = RawDataFrame.extend({
    id: z.number().int(),
  });

  export type GetByIdParams = z.infer<typeof GetByIdParams>;
  export const GetByIdParams = z.object({id: z.coerce.number().int()});

  export type GetManyParams = z.infer<typeof GetManyParams>;
  export const GetManyParams = z.object({
    year: z.coerce.number().int().optional(),
    lat: z.coerce.number().optional(),
    lon: z.coerce.number().optional(),
  });

  export type DeleteDataFrameParams = GetByIdParams;
  export const DeleteDataFrameParams = GetByIdParams;

  export type CreateDataFrameParams = z.output<typeof CreateDataFrameParams>;
  export const CreateDataFrameParams = z.object({
    lat: z.coerce.number(),
    lon: z.coerce.number(),
    pm: z.coerce.number(),
    year: z.coerce.number(),
  });
}
