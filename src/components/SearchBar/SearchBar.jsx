import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import s from './Searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });
  const initialValues = {
    name: '',
  };

  const handleSubmit = async (values, actions) => {
    console.log(values);

    await onSubmit(values);
  };

  return (
    <header className="Searchbar">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form action="" className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <Field
            type="text"
            autoComplete="off"
            autoFocus
            name="name"
            className={s.SearchFormInput}
            placeholder="Search images and photos"
          />

          <ErrorMessage component="div" name="name" />
        </Form>
      </Formik>
    </header>
  );
};
export default SearchBar;
