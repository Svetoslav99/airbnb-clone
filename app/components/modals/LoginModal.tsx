'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

const LoginModal = () => {
    const router = useRouter();

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        setIsLoading(true);
        try {
            // const res = await axios.post('/api/register', data);
            // data here will only have email and password so we can just spread it
            const res = await signIn('credentials', {
                ...data,
                redirect: false
            });

            if (res?.ok) {
                toast.success('Logged in');
                router.refresh(); // needed to update trigger of updating all the active values.
                loginModal.onClose();
            }

            if (res?.error) {
                throw new Error(res.error);
            }
        } catch (e) {
            toast.error((e as Error).message ?? 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleRegistrationModal = useCallback(()=> {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subtitle='Login to your account!' />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className=' text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>First time using Airbnb?</div>
                    <div onClick={toggleRegistrationModal} className='text-neutral-800 cursor-pointer hover:underline'>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
