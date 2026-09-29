'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

const schema = z.object({
  coinId: z.string().nonempty({ message: '' }),

  amount: z.number({ message: '' }).min(0.01, { message: '' }),

  price: z.number({ message: '' }).min(0.01, { message: '' }),

  total: z.number({ message: '' }).min(0.01, { message: '' }),
});

type Inputs = z.infer<typeof schema>;

export const AddAssetForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });


    const onSubmit: SubmitHandler<Inputs> =  (data) => {
       console.log(data);
    };

  return <div>AddAssetForm</div>;
};
