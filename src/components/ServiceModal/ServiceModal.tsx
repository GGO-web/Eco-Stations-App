import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useCreateNewServiceMutation, useUpdateExistingServiceMutation } from '../../redux/services/services';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

import { PlacesAutocomplete } from '../PlacesAutocomplete/PlacesAutocomplete';
import { WasteList } from './components/WasteList';
import { PaymentList } from './components/PaymentList';
import { DeliveryList } from './components/DeliveryList';

import 'react-toastify/dist/ReactToastify.css';
import { IService } from '../../models/service.model';

export function ServiceModal({ isUpdateService = false }:
{ isUpdateService?: boolean }) {
  const { setPopupState, setUpdatePopupState, setCurrentService } = useActions();

  const [service, setService] = isUpdateService
    ? [useAppSelector((store) => store.service.service), setCurrentService]
    : useState<IService>({
      id: 0,
      address: '',
      serviceName: '',
      paymentConditions: [],
      coordinate: {
        longitude: 0,
        latitude: 0,
      },
      typeOfWastes: [],
      deliveryOptions: [],
      rating: 0,
      priceOfService: 0,
      description: '',
    });

  const [descArr, setDescArr] = useState(service?.description
    ? JSON.parse(service?.description as string) : []);

  const [description, setDescription] = useState<string>(descArr[0] || '');

  const [createService] = useCreateNewServiceMutation();
  const [updateExistingService] = useUpdateExistingServiceMutation();

  const handleSubmitService = async () => {
    if (service.serviceName === '') {
      toast.error('Please write your service name 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    } if (service.description === '') {
      toast.error('Please write your service description 😅', {
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
    } if (!service.address) {
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

      const descriptionEdited = `[${
        JSON.stringify(descArr[0])
      },${
        JSON.stringify(descArr[1])
      }, ${
        JSON.stringify(descArr[2])
      }]`;

      await updateExistingService({ ...service, description: descriptionEdited }).unwrap();

      setUpdatePopupState(false);
    }

    if (!isUpdateService) {
      toast.success('Congrats! Your service have been created 🥳', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      await createService(service).unwrap();

      setPopupState(false);
    }
  };

  const popupHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('wrapper-popup')) {
      setPopupState(false);
      setUpdatePopupState(false);
    }
  };

  useEffect(() => {
    setDescArr((prevState: string[]) => {
      prevState[0] = description;

      return prevState;
    });

    const descriptionChanged = `[${
      JSON.stringify(descArr[0])
    },${
      JSON.stringify(descArr[1])
    }, ${
      JSON.stringify(descArr[2])
    }]`;

    setService({ ...service, description: descriptionChanged });
  }, [service.typeOfWastes, service.paymentConditions, service.deliveryOptions, description]);

  return (
    <div
      onClick={(e) => popupHandleClick(e)}
      className="bg-light fixed w-full h-screen left-0 top-0 grid place-items-center p-5 wrapper-popup"
    >
      <div className="bg-white rounded-2xl p-5 max-w-[550px]">
        <h4 className="description-center pb-5 text-2xl">
          {isUpdateService ? 'Update' : 'Create'}
          {' '}
          Service
        </h4>

        <div className="mb-2">
          <label htmlFor="serviceName">Your Service Name</label>

          <input
            name="serviceName"
            value={service.serviceName}
            onChange={(e) => {
              e.preventDefault();

              setService({ ...service, serviceName: e.target.value });
            }}
            className="w-full p-3 border-dark-green rounded-2xl border-2 outline-none"
            placeholder="Enter your service name..."
            type="description"
            id="serviceName"
          />
        </div>

        <div className="mb-2 relative">
          <label htmlFor="serviceAddress">Your Service Address</label>

          <PlacesAutocomplete
            defaultAddress={service.address as string}
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
            onChange={(e) => {
              setDescription(e.target.value);
              setCurrentService({ ...service, description: e.target.value });
            }}
            value={description}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-2" htmlFor="types">Waste Types You Can Carry</label>

          <WasteList
            descArr={descArr}
            setDescArr={setDescArr}
            service={service}
            setService={setService}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-2" htmlFor="pay">Your Payment Conditions</label>

          <PaymentList
            service={service}
            setService={setService}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2" htmlFor="delivery">Your Delivery Options</label>

          <DeliveryList
            descArr={descArr}
            setDescArr={setDescArr}
            service={service}
            setService={setService}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setPopupState(false);
              setUpdatePopupState(false);
            }}
            className="font-semibold uppercase rounded description-white bg-[#b14e46] px-6 py-2"
          >
            Quit
          </button>

          <button
            type="button"
            onClick={handleSubmitService}
            className="font-semibold uppercase rounded description-white bg-[#7bae37] px-6 py-2"
          >
            Submit
          </button>
        </div>
      </div>

    </div>
  );
}
