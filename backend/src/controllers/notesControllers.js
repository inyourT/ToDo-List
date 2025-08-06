import Note from "../model/Note.js"
import mongoose from "mongoose";



export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1}) // newest first
        res.status(200).json(notes)
    } catch (error){
        console.error("Error in gatAllNotes controller", error);
        res.status(500).json({message: "Internall server error"});
    }
};

export async function getNoteById(req,res) {

    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message: "Note not found"})
        res.json(note)
    } catch (error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({message: "Internall server error"});
    }
}

export async function createNote(req, res) {
    try{
        const {title,content} = req.body
        const note = new Note({title,content});

        const saveNote = await note.save();
        res.status(201).json(saveNote);

    }catch(error){
        console.error("Error in createNotes controller", error);
        res.status(500).json({message: "Internall server error"});
    }
};

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body
        const updateNote = await Note.findByIdAndUpdate(req.params.id, {title,content},
            {
                new:true,
            });

        if(!updateNote) return res.status(404).json({message: "Note not found"})

        res.status(200).json(updateNote)

    } catch (error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).json({message: "Internall server error"});
    }
};

export async function deleteNote(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote) return res.status(404).json({message: "note not found"})
        res.status(200).json({message: "delete succes"})
    } catch (error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).json({message: "Internall server error"});
    } 
};