'use client';

import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {error} from "next/dist/build/output/log";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

interface Props {

}

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'BRA',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',

        },
        mode:'onBlur'
    }, );

    const onSubmit = async(data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1 className="form-title">Cadastre-se e Personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="João Vitor"
                    register={register}
                    error={errors.fullName}
                    validation={{required: 'O Nome Completo é Obrigatório!', minLength: 2}}
                />
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Insira seu e-mail"
                    register={register}
                    error={errors.email}
                    validation={{required: 'O E-mail é Obrigatório!', pattern: /^\w+@\w+\.\w+$/, message:'O E-mail é obrigatório!'}}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Insira uma senha forte"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'A senha é Obrigatória!', minLength: 8}}
                />

                <CountrySelectField name="country" label="Country" control={control} error={errors.country} required/>

                <SelectField
                    name="InvestmentGoals"
                    label="Objetivo dos Imvestimentos"
                    placeholder="Selecione seu investimento:"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Risco de Tolerância"
                    placeholder="Selecione seu nível de risco:"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Indústria Preferida"
                    placeholder="Selecione sua indústria preferida:"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

            <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                {isSubmitting ? 'Criando Conta' : 'Começe agora sua jornada de investimentos'}
                </Button>
                
                <FooterLink text="Já possui uma conta?" linkText="Faça seu login" href="/sign-in" />
            </form>
        </>
    )
}

export default SignUp;