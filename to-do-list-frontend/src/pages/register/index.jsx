import React from 'react'
import { useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Container, Img, Wrapper, Button, Form, ColumnLeft, ColumnRight, Row, Text, CreateText } from './styles';
import logo from '../../assets/logo.png'
import { Input } from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api';

const schema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('email não é valido').required('Campo Obrigatório'),
    password: yup.string().min(3, 'No minimo 3 caracteres').required('Campo Obrigatório'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais').required('Confirme sua senha'),
  }).required();

const Register = () => {
    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
    
            const response = await api.post('/auth/register', {
              userName: formData.name,
              email: formData.email,
              password: formData.password,
            });
        
            // Supondo que a API retorne sucesso com status 201
            if (response.status === 201 || response.data) {
              alert('Conta criada com sucesso!');
              navigate('/'); // Redireciona para a tela de login após o cadastro
            } 
        }catch(error){
          console.log(error.response)
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
                        <Input placeholder="E-mail" name="email" control={control} errorMessage={errors?.email?.message}/>
                        <Input placeholder="Nome" name="name" control={control} errorMessage={errors?.name?.message}/>
                        <Input type="password" placeholder="Senha" name="password" control={control} errorMessage={errors?.password?.message}/>
                        <Input type="password" placeholder="Confirmar a senha" name="confirmPassword" control={control} errorMessage={errors?.confirmPassword?.message}/>
                        <Button title="Entrar" variant="secondary" type="submit">Criar Conta</Button>
                    </Form>
                    <Row>
                        <Text>Já tem uma conta?</Text>
                        <CreateText onClick={() => navigate('/')}>Entrar</CreateText>
                    </Row>
                </Wrapper>

            </ColumnRight>
        </Container>
    );
}

export { Register }