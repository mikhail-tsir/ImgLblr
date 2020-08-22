package com.example.imglblr;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.FileProvider;
import androidx.fragment.app.Fragment;
import androidx.navigation.fragment.NavHostFragment;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FirstFragment extends Fragment {
    Button takePic;
    ImageView image;
    private boolean proceedToNext;
    // String pathToFile;

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState
    ) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_first, container, false);
    }

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        takePic = view.findViewById(R.id.btn_take_pic);
        image = view.findViewById(R.id.image);
        proceedToNext = false;

        if (Build.VERSION.SDK_INT >= 23) {
            requestPermissions(new String[] {Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE}, 2);
        }

        takePic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pictureTakerAction();
                if (proceedToNext) {
                    NavHostFragment.findNavController(FirstFragment.this)
                            .navigate(R.id.action_FirstFragment_to_SecondFragment);
                }
            }
        });
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        getActivity();
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == 1) {
                proceedToNext = true;
            }
        }
    }


    private void pictureTakerAction() {
        Intent takePic = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePic.resolveActivity(getActivity().getPackageManager()) != null) {
            File photoFile = null;
            try {
                photoFile = createPhotoFile();
                if (photoFile != null) {
                    MainActivity.pathToFile = photoFile.getAbsolutePath();
                    Uri photoUri = FileProvider.getUriForFile(getContext(), "com.example.imglblr.fileprovider", photoFile);
                    takePic.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
                    //startActivityForResult(takePic, 1);
                    proceedToNext = true;
                }

            } catch (Exception e) {
                Log.d("mylog", e.toString());
                proceedToNext = false;
            }
        } else {
            proceedToNext = false;
        }
    }

    private File createPhotoFile() throws NullPointerException {
        @SuppressLint("SimpleDateFormat") String name = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        File storePic = getActivity().getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File img = null;
        try {
            img = File.createTempFile(name, ".jpg", storePic);
        } catch (Exception e) {
            Log.d("mylog", e.toString());
        }
        return img;
    }
}