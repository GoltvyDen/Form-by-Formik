import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import { Children } from 'react';
import * as Yup from 'yup';

const TextInput = ({label, ...props}) => {
    const [field, meta] = useField(props); // field it's props, meta it's metadata with errors and were\weren't used specific input
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ): null}
        </>
    )
};

const Checkbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'}); // field it's props, meta it's metadata with errors and were\weren't used specific input
    return (
        <>
            <label className='checkbox'>
                <input type='checkbox' {...props} {...field}/>
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ): null}
        </>
    )
};

const F = () => {
    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}

            validationSchema = {Yup.object({
                name: Yup.string().min(2, 'Минимум два символа')
                                  .max(30, 'Максимум 30 символов')
                                  .required('Обязательное поле!'),
                email: Yup.string().email('Некорректный ввод')
                                   .required('Обязательное поле!'),
                amount: Yup.number().min(5, 'Минимум 5')
                                    .required('Обязательное поле!'),
                currency: Yup.string().required('Выберите валюту'),
                text: Yup.string().min(10, 'Минимум 10 символов'),
                terms: Yup.boolean().required('Необходимо согласие!')
                                    .oneOf([true], 'Необходимо согласие!')
            })}

            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <TextInput
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                />
                <TextInput
                    label='Ваша почта'
                    id="email"
                    name="email"
                    type="email"
                />
                <TextInput
                    label='Количество'
                    id="amount"
                    name="amount"
                    type="number"
                />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as='select'>
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as='textarea'
                />
                <ErrorMessage className='error' name='text' component='div'/>
                <Checkbox name='terms'>
                    Соглашаетесь с политикой конфиденциальности?
                </Checkbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}
export default F;