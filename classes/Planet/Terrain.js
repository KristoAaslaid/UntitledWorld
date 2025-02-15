import Region from "./Region.js";
import Planet from "./Planet.js";


class Terrain {
    constructor(name,symbol, x, y, color,img,width,height,style="",description="No data",isLandable=true,isPassable=true,location=null,isActivity=false) {
        this.color = color;
        this.symbol = symbol;
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.width = width;
        this.height = height;
        this.style = style;
        this.description = description;
        this.isLandable = isLandable;
        this.location = location;
        this.isPassable = isPassable;
        this.playerPresent = false;
        this.playerTransportPresent = false;
    }
    modifyTerrain(newTerrain) {
        this.symbol = newTerrain?.symbol;
        this.color = newTerrain?.color;
        this.name = newTerrain?.name;
        this.img = newTerrain?.img;
        this.width = newTerrain?.width;
        this.height = newTerrain?.height;
        this.style = newTerrain?.style;
        this.description = newTerrain?.description;
        this.isLandable = newTerrain?.isLandable;
    }
    changeDescription(newDescription) {
        this.description = newDescription;
    }
    destroy(reason) {
        this.description = `This ${this.name} was destroyed by ${reason}`;
        this.name = `Destroyed ${this.name}`;
        this.symbol = '...';
        this.img = './img/fire.png?';
    }
    handlePlayerBypassing(counter) {
        if (this.isPassable) {
            console.log(`Passed through ${this.name} at ${this.x},${this.y}`);
            setTimeout(() => {
                const el = document.getElementById(`${this.x + '-' + this.y}`)
                el.style.animation = "playerPassing 200ms";
            }, counter * 200);
            return true;
        }
        console.log(`Can't pass through ${this.name} at ${this.x},${this.y}`);
        return false;
    }
    handlePlayerArrival() {
        if (this.isPassable) {
            this.playerPresent = true;
            if (!this.playerTransportPresent) {
                this.terrImg = this.img;
                this.terrDescription = this.description;
                this.terrSize = this.width;
                this.terrColor = this.color;
                this.color = "#F3EFE0";
                this.description = "You are here";
                this.img = './img/character/location.png?';
                this.width = 40;
                this.height = 40;
            }
            console.log(`Arrived to ${this.name} at ${this.x},${this.y}`);
            return true;
        }
        return false;
    }
    handlePlayerDeparture() {
        this.playerPresent = false;
        if (!this.playerTransportPresent) {
            this.description = this.terrDescription;
            this.color = this.terrColor;
            this.img = this.terrImg;
            this.width = this.terrSize;
            this.height = this.terrSize;
        }
    }
    handleLanding(shipType,size,shipImg) {
        console.log(`Trying to land on ${this.name}| Landing is possible: ${this.isLandable}`);
        if (this.isLandable){
            if (this.playerTransportPresent) {
                alert("There is already a ship here");
                return false;
            }
            this.terrImg = this.img;
            this.terrDescription = this.description;
            this.terrSize = this.width;
            this.terrColor = this.color;
            this.terrStyle = this.style;
            this.style = "border-radius: 10px";
            this.color = "rgba(0,0,0,0.3)";
            this.width = size;
            this.height = size;
            this.playerTransportPresent = true;
            this.playerPresent = true;
            this.description = `Your ${shipType} is here`;
            this.img = shipImg;
            console.log(`Landed on ${this.name} at ${this.x},${this.y}`);
            return true;
        }
        return false;
    }
    handleTakeOff() {
        if (this.playerTransportPresent && this.playerPresent) {
            this.img = this.terrImg;
            this.description = this.terrDescription;
            this.width = this.terrSize;
            this.height = this.terrSize;
            this.color = this.terrColor;
            this.style = this.terrStyle;
            this.playerTransportPresent = false;
            this.playerPresent = false;
            console.log(`Took off from ${this.name} at ${this.x},${this.y}`);
            if (this.name === "House" || this.name === "Farm" || this.name === "Camp") {
                this.destroy(" the player taking off");
            }
            return true;
        }
        return false;
    }
}

export default Terrain;
