package com.react_native_neon_android;

import com.gaadi.neon.util.FileInfo;
import java.util.List;

public class ImageCollectionResponse {
    private List<FileInfo> imageCollection;
    private int responseCode = 1;

    public List<FileInfo> getImageCollection() {
        return imageCollection;
    }

    public void setImageCollection(List<FileInfo> imageCollection) {
        this.imageCollection = imageCollection;
    }

    public int getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(int responseCode) {
        this.responseCode = responseCode;
    }
}
