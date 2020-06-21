import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/devradar', 
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true},
);