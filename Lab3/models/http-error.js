class HttpError extends Error {
    constructor(mensaje, erroCode){
        super(mensaje);
        this.code=erroCode;
    }
}



export default HttpError;