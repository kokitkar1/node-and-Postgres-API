const Pool = require('pg').Pool

const pool = new Pool({
    user:process.env.USER,
    host:'localhost',
    database:'TODO',
    password:process.env.PASSWORD,
    port:5432
})


// const createEmployee = (req,res) => {
//     const {name,email} = req.body

//     pool.query('INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING *',[name,email], (err,result) =>{
//         if(err){
//             console.log(err);
//             throw err
//         }

//         res.status(200).json({
//             msg:'Data created successfully',
//             data:result.rows[0]
//         })
//     } )
// }

const createEmployee = (req, res) => {
    const { name, email } = req.body;

    pool.query('INSERT INTO employees (name, email) VALUES ($1, $2) RETURNING *', [name, email], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        res.status(200).json({
            success: true,
            msg: 'Data created successfully',
            data: result.rows[0]
        });
    });
};


const getEmployees = (req,res) => {
    pool.query('SELECT * FROM employees', (err,result) => {
        if(err){
            throw err;
        }
        res.status(200).json({
            success: true,
            msg: 'Data created successfully',
            data: result.rows
        });
    })
}


const getEmployeesById = (req,res) => {

    let id = parseInt(req.params.id)
    pool.query('SELECT * FROM employees WHERE id=$1',[id], (err,result) => {
        if(err){
            throw err;
        }
        res.status(200).json({
            success: true,
            msg: 'Data created successfully',
            data: result.rows
        });
    })
}

const updateEmployee = (req,res) => {
    let id = parseInt(req.params.id)
    const {name,email} = req.body

    pool.query('UPDATE employees SET name =$1,email=$2 WHERE id=$3',[name,email,id], (err,result) => {
        if(err){
            throw err;
        }
        res.status(200).json({
            success: true,
            msg: 'Data updated successfully',
        });
    })
}


const deleteEmployee = (req,res) => {
    let id = parseInt(req.params.id);

    pool.query('DELETE FROM employees WHERE id=$1',[id], (err,result) =>{
        if(err){
            throw err;
        }
        res.status(200).json({
            success: true,
            msg: 'Data deleted successfully',
        });
    })
}

module.exports = {createEmployee,getEmployees,getEmployeesById,updateEmployee,deleteEmployee}