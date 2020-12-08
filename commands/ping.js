module.exports = {
	name: 'ping',
	description: 'Verifica que el bot funcione',
	extended: "Envia un mensaje al bot y response `Pong` si esta activo",
	execute(message, args) {
		message.channel.send('Pong');
	},
};