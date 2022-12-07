import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useCreateNewServiceMutation, useUpdateExistingServiceMutation } from '../../redux/services/services';
import { PlacesAutocomplete } from '../PlacesAutocomplete/PlacesAutocomplete';

import { useActions } from '../../hooks/actions';

import { DeliveryOptions, PaymentConditions, TypesOfWaste } from './Options';

import { IService } from '../../models/service.model';

import 'react-toastify/dist/ReactToastify.css';

export function ServiceModal({ isUpdateService = false, updateService }:
{ isUpdateService?: boolean;
  updateService?: IService }) {
  const [service, setService] = useState<IService>({
    id: updateService?.id || 0,
    address: updateService?.address || '',
    serviceName: updateService?.serviceName || '',
    typeOfWastes: updateService?.typeOfWastes || [],
    paymentConditions: updateService?.paymentConditions || [],
    deliveryOptions: updateService?.deliveryOptions || [],
    description: updateService?.description || '',
    coordinate: {
      id: updateService?.coordinate.id || 0,
      latitude: updateService?.coordinate.latitude || 0,
      longitude: updateService?.coordinate.longitude || 0,
    },
  });

  const [descArr, setDescArr] = useState(updateService?.description
    ? JSON.parse(updateService?.description as string) : []);

  const [text, setText] = useState<string>(descArr[0] || '');
  const [priceOfWaste, setPriceOfWaste] = useState(descArr[1] || {});
  const [priceOfDelivery, setPriceOfDelivery] = useState(descArr[2] || {});
  console.log(priceOfWaste);
  console.log(priceOfDelivery);

  const TypeOfWasteInitialCheckers = new Array(TypesOfWaste.length).fill(false);
  const DeliveryOptionsInitialCheckers = new Array(DeliveryOptions.length).fill(false);
  const PaymentConditionsInitialCheckers = new Array(PaymentConditions.length).fill(false);

  const [createService] = useCreateNewServiceMutation();
  const [updateExistingService] = useUpdateExistingServiceMutation();

  const [checkedStateWaste, setCheckedStateWaste] = useState(
    service.typeOfWastes.length > 0
      ? TypesOfWaste?.map((type:string, index: number) => (service.typeOfWastes.includes(type)
        ? TypeOfWasteInitialCheckers[index] = true : false))
      : TypeOfWasteInitialCheckers,
  );
  const [checkedStateOptions, setCheckedStateOptions] = useState(
    service.deliveryOptions.length > 0
      ? DeliveryOptions
        ?.map((option: string, index: number) => (service.deliveryOptions.includes(option)
          ? DeliveryOptionsInitialCheckers[index] = true : false))
      : DeliveryOptionsInitialCheckers,
  );
  const [checkedStatePayment, setCheckedStatePayment] = useState(
    service.paymentConditions.length > 0
      ? PaymentConditions
        ?.map((pay: string, index: number) => (service.paymentConditions.includes(pay)
          ? DeliveryOptionsInitialCheckers[index] = true : false))
      : PaymentConditionsInitialCheckers,
  );

  const { setPopupState, setUpdatePopupState } = useActions();

  useEffect(() => {
    setDescArr([text as never, priceOfDelivery as never, priceOfWaste as never]);
    setService((prevState) => ({ ...prevState, description: JSON.stringify(descArr) }));
  }, [text, priceOfDelivery, priceOfDelivery]);

  const handleSubmitService = async () => {
    if (service.serviceName === '') {
      toast.error('Please write your service name 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    } if (service.typeOfWastes.length === 0) {
      toast.error('Please specify what waste you can carry 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    } if (service.deliveryOptions.length === 0) {
      toast.error('Please specify how can you take the waste 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    } if (service.paymentConditions.length === 0) {
      toast.error('Please specify how can user pay for you 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    } if (service.coordinate.latitude === 0 || service.coordinate.longitude === 0) {
      toast.error('Please write your service address 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    }

    if (isUpdateService) {
      toast.success('Congrats! Your service have been updates 🥳', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      setUpdatePopupState(false);
      await updateExistingService(service).unwrap();
    }
    if (!isUpdateService) {
      toast.success('Congrats! Your service have been created 🥳', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      setPopupState(false);
      await createService(service).unwrap();
    }
  };

  const popupHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('wrapper-popup')) {
      setPopupState(false);
      setUpdatePopupState(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setService((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckTypes = (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
    const updatedCheckedState = checkedStateWaste
      .map((item, index) => (index === position ? !item : item));

    setCheckedStateWaste(updatedCheckedState);

    let updatedList = [...service.typeOfWastes];
    if (e.target.checked) {
      updatedList = [...service.typeOfWastes, e.target.value];
    } else {
      updatedList.splice(service.typeOfWastes.indexOf(e.target.value), 1);
    }
    setService((prevState) => ({ ...prevState, typeOfWastes: updatedList }));
  };

  const handleCheckOptions = (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
    const updatedCheckedState = checkedStateOptions
      .map((item, index) => (index === position ? !item : item));

    setCheckedStateOptions(updatedCheckedState);

    let updatedList = [...service.deliveryOptions];
    if (e.target.checked) {
      updatedList = [...service.deliveryOptions, e.target.value];
    } else {
      updatedList.splice(service.deliveryOptions.indexOf(e.target.value), 1);
    }
    setService((prevState) => ({ ...prevState, deliveryOptions: updatedList }));
  };

  const handleCheckPayment = (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
    const updatedCheckedState = checkedStatePayment
      .map((item, index) => (index === position ? !item : item));

    setCheckedStatePayment(updatedCheckedState);

    let updatedList = [...service.paymentConditions];
    if (e.target.checked) {
      updatedList = [...service.paymentConditions, e.target.value];
    } else {
      updatedList.splice(service.paymentConditions.indexOf(e.target.value), 1);
    }
    setService((prevState) => ({ ...prevState, paymentConditions: updatedList }));
  };

  return (
    <div
      onClick={(e) => popupHandleClick(e)}
      className="bg-light fixed w-full h-screen left-0 top-0 grid place-items-center p-5 pt-10 wrapper-popup"
    >
      <div className="bg-white rounded-2xl p-5 max-w-[550px]">
        <h4 className="text-center pb-5 text-2xl">
          {isUpdateService ? 'Update' : 'Create'}
          {' '}
          Service
        </h4>
        <div className="mb-2">
          <label htmlFor="serviceName">Your Service Name</label>
          <input
            name="serviceName"
            value={service.serviceName}
            onChange={handleChange}
            className="w-full p-3 border-dark-green rounded-2xl border-2 outline-none"
            placeholder="Enter your service name..."
            type="text"
            id="serviceName"
          />
        </div>
        <div className="mb-2 relative">
          <label htmlFor="serviceAddress">Your Service Address</label>
          <PlacesAutocomplete
            setService={setService}
            service={service}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="serviceName">Service Description</label>
          <textarea
            name="serviceDescription"
            className="w-full p-3 border-dark-green rounded-2xl border-2 outline-none h-14"
            placeholder="Enter your service description..."
            id="serviceDescription"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="types">Waste Types You Can Carry</label>
          <div className="flex gap-4 items-center flex-wrap">
            {TypesOfWaste.map((type, index) => (
              <div className={`flex items-center gap-1 ${checkedStateWaste[index] && 'w-full'}`} key={uuidv4()}>
                <input
                  value={type}
                  type="checkbox"
                  onChange={(e) => handleCheckTypes(e, index)}
                  checked={checkedStateWaste[index]}
                  id="types"
                  className="cursor-pointer accent-dark-green"
                  style={{ accentColor: '#379683' }}
                />
                <span>{type}</span>
                {checkedStateWaste[index] && (
                <input
                  autoFocus
                  value={priceOfWaste[type as never]}
                  onChange={(e) => {
                    setPriceOfWaste({ ...priceOfWaste, [type]: e.target.value });
                  }}
                  className="grow p-3 border-dark-green rounded-2xl border-2 outline-none"
                  type="text"
                  placeholder="Write down price here. It should be like: 0.01 EUR/kg"
                />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="pay">Your Payment Conditions</label>
          <div className="flex gap-4 items-center">
            {PaymentConditions.map((pay, index) => (
              <div className="flex items-center gap-1" key={uuidv4()}>
                <input
                  value={pay}
                  type="checkbox"
                  onChange={(e) => handleCheckPayment(e, index)}
                  checked={checkedStatePayment[index]}
                  id="pay"
                  className="cursor-pointer accent-dark-green"
                />
                <span>{pay}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="delivery">Your Delivery Options</label>
          <div className="flex gap-4 items-center flex-wrap">
            {DeliveryOptions.map((deliver, index) => (
              <div className={`flex items-center gap-1 ${checkedStateOptions[index] && 'w-full'}`} key={uuidv4()}>
                <input
                  value={deliver}
                  type="checkbox"
                  onChange={(e) => handleCheckOptions(e, index)}
                  checked={checkedStateOptions[index]}
                  id="delivery"
                  className="cursor-pointer accent-dark-green"
                />
                <span>{deliver}</span>
                {checkedStateOptions[index] && (
                  <input
                    autoFocus
                    value={priceOfDelivery[deliver as never]}
                    onChange={(e) => {
                      setPriceOfDelivery(
                        (prevState: any) => ({ ...prevState, [deliver]: e.target.value }),
                      );
                    }}
                    className="grow p-3 border-dark-green rounded-2xl border-2 outline-none"
                    type="text"
                    placeholder="Write down price here. It should be like: 1 EUR/ 20kg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setPopupState(false);
              setUpdatePopupState(false);
            }}
            className="font-semibold uppercase rounded text-white bg-[#b14e46] px-6 py-2"
          >
            Quit
          </button>
          <button
            type="button"
            onClick={handleSubmitService}
            className="font-semibold uppercase rounded text-white bg-[#7bae37] px-6 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
