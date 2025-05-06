import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { addProperty } from '../services/propertiesService';
import { useAuth } from '../contexts/AuthContext';
import { useSideBarContext } from '../layouts/PrivateLayout';

export default function PropertiesAdd() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { setOptions } = useSideBarContext();
  const { token } = useAuth();
  const [alert, setAlert] = useState('');
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    setOptions([{ name: 'Voltar', path: `/${userId}/properties` }]);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('imagem', image);
    formData.append('nome', name);
    formData.append('endereco', adress);

    addProperty(formData, token).then(res => {
      if (res !== true) {
        setAlert(JSON.stringify(res));
      } else {
        navigate(-1, { replace: true });
      }
    });
  }

  return (
    <div className="flex column-center size100">
      <form onSubmit={handleSubmit} className="flex column-center gap-1">
        <h1>Imovel</h1>

        <div>
          <p className="marborpad0">nome:</p>
          <input onChange={e => setName(e.target.value)} required />
        </div>

        <div>
          <p className="marborpad0">endereço:</p>
          <input onChange={e => setAdress(e.target.value)} required />
        </div>

        <div className="flex column-center gap-1">
          <p className="marborpad0">imagem:</p>
          {previewUrl ? (
            <img className="border-radius-1rem" src={previewUrl} alt="Preview" width="50%"></img>
          ) : (
            <></>
          )}
          <input
            type="file"
            onChange={e => {
              setImage(e.target.files[0]);
              const url = URL.createObjectURL(e.target.files[0]);
              setPreviewUrl(url);
            }}
            required
          />
        </div>

        <p className="alert">{alert}</p>
        <button type="submit" className="button1">
          Continuar
        </button>
      </form>
    </div>
  );
}
