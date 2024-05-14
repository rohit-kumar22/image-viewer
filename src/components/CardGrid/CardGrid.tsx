import React, { useState } from 'react';
import {
    Grid, Card, CardMedia, CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button, Typography
} from '@mui/material';

// Define an interface for each image item 
interface Image {
    urls: {
        small: string;
        regular: string;
    };
    alt_description: string | null; 
    description?: string;
    user: {
        name: string;
    };
}

// Define the props interface
interface CardGridProps {
    imageData: Image[];
    isLoading: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({ imageData, isLoading }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    const handleClickOpen = (image: Image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <Grid container spacing={2} padding={2} sx={{ position: 'relative' }}>
                {imageData.map((img, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(img)}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={img.urls.small}
                                alt={img.alt_description || "Image description not available"}  // Providing a fallback string
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {isLoading && <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />}
            {!imageData.length && !isLoading && <Typography>No images found. Please refresh the page!</Typography>}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Title: {selectedImage?.user.name}</DialogTitle>
                <DialogContent>
                    <img src={selectedImage?.urls.regular} alt={selectedImage?.alt_description || "Image description not available"} style={{ width: '100%', height: '400px' }} />
                    <DialogContentText style={{ marginTop: '20px' }}>
                        {selectedImage?.description || 'No description available.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CardGrid;
