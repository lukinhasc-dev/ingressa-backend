package br.com.ingressa.util;

public class ResponseMessage {
    private String message;
    private boolean success;

    public ResponseMessage(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }
}
