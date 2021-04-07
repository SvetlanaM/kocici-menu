import { ChangeEvent, useCallback, useState } from 'react';
import { Cat_Insert_Input } from '../graphql/generated/graphql';

//pozeram s tym toolom ani neni treba
export type CatInputData = Omit<Cat_Insert_Input, 'id' | 'image_url'>;

interface CatFormInterface {
  cat?: CatInputData;
  handleSubmit: { (cat: CatInputData): Promise<boolean> };
  submitText: string;
}

const CatForm = ({ cat, handleSubmit, submitText }: CatFormInterface) => {
  const [name, setName] = useState<string>(cat?.name ?? '');
  const [age, setAge] = useState<number>(cat?.age ?? 0);
  const [doctorEmail, setEmail] = useState<string>(cat?.doctor_email ?? '');
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericAge = Number(event.target.value);
    setAge(numericAge);
  };
  const onDoctorEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = useCallback(() => {
    const catInput: CatInputData = {
      age: age,
      name: name,
      user_id: 1,
      doctor_email: doctorEmail,
    };

    handleSubmit(catInput).then((success: boolean) => {
      if (success) {
        console.log('jupiii');
      }
    });
  }, [handleSubmit, name, age, doctorEmail]);

  return (
    <>
      <form>
        <input
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Meno macky"
        ></input>
        <input
          type="number"
          value={age}
          onChange={onAgeChange}
          placeholder="Vek macky"
        ></input>
        <input
          type="email"
          value={doctorEmail}
          onChange={onDoctorEmailChange}
          placeholder="Email veterinara"
        ></input>
        <button onClick={onSubmit}>{submitText}</button>
      </form>
    </>
  );
};

export default CatForm;
