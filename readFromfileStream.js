const fs=require('fs')

const readStream=fs.createReadStream('input.txt','utf8')

const writeStream=fs.createWriteStream('output.txt','utf8')

let dataBuffer = '';//for collect data without error

// readStream.pipe(writeStream)//read data from input.txt and write it to output.txt

readStream.on('data',(chunk)=>{
    dataBuffer+=chunk;
    // const filterData=dataBuffer.split('\n').filter(line=>!line.includes('error')).join('\n')
    const filterData=dataBuffer.split('\n').
                                filter(line=>!line.toLowerCase().includes('error')).
                                join('\n')

    writeStream.write(filterData)
    console.log("read and write succsesfully")
})

// readStream.on('end',()=>{
//     console.log("reading completed")//using when we want all data to be read,is not necessary to use it
// })

readStream.on('error',(err)=>{
    console.log("error reading file",err)
})



writeStream.on('error',(err)=>{
    console.log("error reading file",err)
})
