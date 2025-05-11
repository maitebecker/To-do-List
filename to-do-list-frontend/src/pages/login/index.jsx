import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { Container, Img, Wrapper, Button, Form, ColumnLeft, ColumnRight, Row, Text, CreateText, PasswordText } from './styles';
import logo from '../../assets/logo.png'
import { api } from '../../services/api';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/Input'

const schema = yup.object({
    email: yup.string().email('Email não é válido').required('Campo Obrigatório'),
    password: yup.string().min(3, 'No mínimo 3 caracteres').required('Campo Obrigatório'),
}).required();

const Login = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            console.log("Dados do formulário:", data);
            const response = await api.post('/auth/login', data);
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

           

            if (response.status === 200) {
                navigate("/home");
            }
        } catch (error) {
            // Caso o backend retorne um erro com mensagem
            console.log(error)
            if (error.response.data) {
                alert(error.response.data);
            } else {
                alert('Erro ao fazer login. Tente novamente.');
            }
        }
    };

    return (
        <Container>
            <ColumnLeft>
                <Img src={logo} alt="logo" />
            </ColumnLeft>
            <ColumnRight>
                <Wrapper>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            control={control}
                            errorMessage={errors?.email?.message}
                        />

                        <Input
                            type="password"
                            placeholder="Senha"
                            name="password"
                            control={control}
                            errorMessage={errors?.password?.message}
                        />
                        <PasswordText>Esqueceu a senha?</PasswordText>
                        <Button title="Entrar" variant="secondary" type="submit">Entrar</Button>
                    </Form>
                    <Row>
                        <Text>Não tem uma conta?</Text>
                        <CreateText onClick={() => navigate('/register')}>Cadastre-se</CreateText>
                    </Row>
                </Wrapper>
            </ColumnRight>
        </Container>
    );
};

export { Login };
