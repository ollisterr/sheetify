const timeSignature = {
    first: 4,
    second: 4,
}

function setTimeSignature(f, s) {
    timeSignature.first = f;
    timeSignature.second = s;
}

export { timeSignature, setTimeSignature };