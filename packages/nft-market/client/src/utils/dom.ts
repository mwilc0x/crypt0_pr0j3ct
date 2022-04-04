// this tests if URL is an image
export function loadImage(url: string) { 
	return new Promise((resolve, reject) => { 
		let img = new Image(); 
		img.onload = function() { 
		    resolve(img); 
		} 
		img.onerror = function() { 
			reject(new Error("Image failed to load: "+url)); 
		} 
		img.src = url; 
	}); 
}
