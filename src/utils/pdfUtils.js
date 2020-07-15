import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function savePDF(name = "Untitled song") {
  return html2canvas(document.getElementById("App"), { scrollY: -window.scrollY }).then(function(canvas) {
    const title = name;
    const imgData = canvas.toDataURL("image/jpeg", 2.0);
    const image = document.createElement("img");
    image.src = imgData;
    const doc = new jsPDF();
    doc.setProperties({
      title,
      subject: "Music sheet for " + title
    });
    const width = doc.internal.pageSize.getWidth();

    doc.addImage(imgData, "JPEG", 0, 0, width, image.height);
    doc.save(title + ".pdf");
    
    return canvas;
  });
}