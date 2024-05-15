import React, { useState } from 'react';
import {
    Grid, Card, CardMedia, CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button, Typography
} from '@mui/material';
import {CardGridImage, CardGridProps} from '../../types/image'

const CardGrid: React.FC<CardGridProps> = ({ imageData, isLoading }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<CardGridImage | null>(null);

    const handleClickOpen = (image: CardGridImage) => {
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
            {isLoading && <CircularProgress className='loading'/>}
            {!imageData.length && !isLoading && <Typography>No images found!</Typography>}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Title: {selectedImage?.user.name}</DialogTitle>
                <DialogContent>
                    <img src={selectedImage?.urls.regular} alt={selectedImage?.alt_description || "Image description not available"} className='imagePreview'/>
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
