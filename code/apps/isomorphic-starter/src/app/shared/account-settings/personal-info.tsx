'use client';

import toast from 'react-hot-toast';
import { SubmitHandler } from 'react-hook-form';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import { Form } from '@ui/form';
import { Text, Input } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import ProfileData from "@/app/actions/profil/typerofile";
import viewProfile from "@/app/actions/profil/viewProfile";
import editProfile from "@/app/actions/profil/editProfile"; 

export default function PersonalInfoView() {
  const [dataProfile, setDataProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await viewProfile();
        setDataProfile(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const updateProfile = async () => {
      if (dataProfile && dataProfile.id) { 
        try {
          await editProfile(dataProfile.id); 
        } catch (err) {
          console.error("Error updating profile data:", err);
        }
      }
    };

    updateProfile();
  }, [dataProfile]); 

  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = async (data) => {
    try {
      if (dataProfile && dataProfile.id) {
        await editProfile(dataProfile.id);
      }
      toast.success(<Text as="b">Successfully updated!</Text>);
    } catch (err) {
      toast.error(<Text as="b">Failed to update profile!</Text>);
      console.error('Error updating profile settings:', err);
    }
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Personal Info"
              description="Update your photo and personal details here"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="First Name"
                  {...register('name')}
                  error={errors.name?.message}
                  className="flex-grow"
                />
                <Input
                  placeholder="Last Name"
                  {...register('firstname')}
                  error={errors.firstname?.message}
                  className="flex-grow"
                />
              </FormGroup>
              <FormGroup
                title="Password"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="Password"
                  {...register('password')}
                  error={errors.password?.message}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup
                title="Email Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  className="col-span-full"
                  prefix={
                    <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                  }
                  type="email"
                  placeholder="georgia.young@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </FormGroup>
            </div>

            <FormFooter
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        );
      }}
    </Form>
  );
}
