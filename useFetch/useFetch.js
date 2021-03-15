import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState( { data:null, loading:true, error:null } );

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])//solo se carga la primera vez



    useEffect(() => {

        setState({ data:null, loading:true, error:null });

        fetch(url)
            .then(resp => resp.json())
            .then(data=>{

                if (isMounted.current) {   
                    setState({
                        loading:false,
                        error:null,
                        data
                    });
                }
            })
            .catch(()=>{
                setState({
                    data:null,
                    loading:false,
                    error: 'No se pudo cargar la info'
                })
            });


    },[url]);//solo se ejecuta cuando el url cambia

    return state;//solo retornamos el objeto esta vez
}
