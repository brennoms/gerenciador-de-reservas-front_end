import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { addProperty } from '../services/propertiesService';
import { useAuth } from '../contexts/AuthContext';
import { useSideBarContext } from '../layouts/PrivateLayout';

export default function PropertiesAdd() {
  const navigate = useNavigate();
  const { setOptions } = useSideBarContext();
  const { token } = useAuth();
  const [alert, setAlert] = useState('');
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    setOptions([{ name: 'Voltar', path: -1 }]);
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
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center max-h-full max-w-min">
        <h1 className="default-h1">Imovel</h1>

        <div>
          <p>nome:</p>
          <input className="comum-entry" onChange={e => setName(e.target.value)} required />
        </div>

        <div>
          <p>endereço:</p>
          <input className="comum-entry" onChange={e => setAdress(e.target.value)} required />
        </div>

        <div className="flex flex-col items-center">
          <p>imagem:</p>
          {previewUrl ? <img className="rounded p-2" src={previewUrl} alt="Preview"></img> : <></>}
          <input
            className="block cursor-pointer appearance-none rounded border border-gray-200 bg-white px-3 py-2 text-sm"
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
        <button type="submit" className="default-button my-2">
          Confirmar
        </button>
      </form>
    </div>
  );
}
