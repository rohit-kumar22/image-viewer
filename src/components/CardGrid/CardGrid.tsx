import React, { useState } from 'react';
import { Grid, Card, CardMedia, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';

const CardGrid = ({ imageData, isLoading }: { imageData: any[], isLoading: boolean }) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const handleClickOpen = (image: any) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            <Grid container spacing={2} padding={2} sx={{position: 'relative'}}>
                {imageData.map((img: any, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(img)}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={img.urls.small}
                                alt={img.alt_description}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {isLoading && <CircularProgress style={{ position: 'absolute',top: '50%', left: '50%' }} />}
            {!imageData.length && !isLoading && <Typography>No images found. Please refresh the page!</Typography>}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Title: {selectedImage?.user.name}</DialogTitle>
                <DialogContent>
                    <img src={selectedImage?.urls.regular} alt={selectedImage?.alt_description} style={{ width: '100%', height: '400px' }} />
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
